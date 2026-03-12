import { supabase } from "@/integrations/supabase/client";

// ──── Phone Uniqueness ────

export const checkPhoneUnique = async (phone: string): Promise<boolean> => {
  const { data, error } = await supabase.rpc("check_phone_unique", { _phone: phone });
  if (error) throw error;
  return data as boolean;
};

// ──── Registration ────

export interface RegistrationInsert {
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  account_type: string;
  capital_tier: string;
  plan_capital: number;
  fee_expected: number;
}

export const createRegistration = async (data: RegistrationInsert) => {
  const { data: reg, error } = await supabase
    .from("registrations")
    .insert({
      ...data,
      status: "pending",
      payment_status: "pending",
    })
    .select()
    .single();
  if (error) throw error;
  return reg;
};

export const fetchMyRegistration = async (userId: string) => {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const fetchAllRegistrations = async () => {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const updateRegistrationPayment = async (
  id: string,
  updates: {
    payment_status: string;
    paid_at?: string;
    amount_paid?: number;
    payment_method?: string;
    payment_txid?: string;
    payment_address_used?: string;
  }
) => {
  const { error } = await supabase
    .from("registrations")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
};

// ──── MT5 Accounts ────

export const fetchMT5Account = async (registrationId: string) => {
  const { data, error } = await supabase
    .from("mt5_accounts")
    .select("*")
    .eq("registration_id", registrationId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const fetchAllMT5Accounts = async () => {
  const { data, error } = await supabase
    .from("mt5_accounts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const saveMT5Account = async (
  registrationId: string,
  mt5Login: string,
  mt5Password: string,
  mt5Server: string
) => {
  // Upsert: if exists update, otherwise insert
  const existing = await fetchMT5Account(registrationId);
  if (existing) {
    const { error } = await supabase
      .from("mt5_accounts")
      .update({
        mt5_login: mt5Login,
        mt5_password: mt5Password,
        mt5_server: mt5Server,
        status: "created",
      })
      .eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("mt5_accounts")
      .insert({
        registration_id: registrationId,
        mt5_login: mt5Login,
        mt5_password: mt5Password,
        mt5_server: mt5Server,
        status: "created",
      });
    if (error) throw error;
  }
};

// ──── Copy Links ────

export const fetchAllCopyLinks = async () => {
  const { data, error } = await supabase
    .from("copy_links")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const createCopyLink = async (
  masterRegId: string,
  slaveRegId: string,
  settings?: Record<string, string | number | boolean>
) => {
  const { error } = await supabase
    .from("copy_links")
    .insert([{
      master_registration_id: masterRegId,
      slave_registration_id: slaveRegId,
      status: "active",
      copy_settings: settings ?? {},
    }]);
  if (error) throw error;
};

export const updateCopyLinkStatus = async (id: string, status: string) => {
  const { error } = await supabase
    .from("copy_links")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
};

// ──── Multiplier ────

export const updateMasterMultiplier = async (mt5AccountId: string, multiplier: number) => {
  if (multiplier <= 0) throw new Error("Multiplier must be greater than 0");
  const { error } = await supabase
    .from("mt5_accounts")
    .update({ multiplier } as any)
    .eq("id", mt5AccountId);
  if (error) throw error;
};

export const calculateSlaveLot = (
  masterLot: number,
  multiplier: number,
  minLot = 0.01,
  maxLot = 100,
  lotStep = 0.01
): { lot: number; adjusted: boolean; reason?: string } => {
  let lot = masterLot * multiplier;
  let adjusted = false;
  let reason: string | undefined;

  if (lot < minLot) {
    lot = minLot;
    adjusted = true;
    reason = `Lot ${masterLot * multiplier} below min ${minLot}, normalized to ${minLot}`;
  } else if (lot > maxLot) {
    lot = maxLot;
    adjusted = true;
    reason = `Lot ${masterLot * multiplier} above max ${maxLot}, normalized to ${maxLot}`;
  } else {
    // Normalize to lot step
    const normalized = Math.round(lot / lotStep) * lotStep;
    const rounded = parseFloat(normalized.toFixed(8));
    if (rounded !== lot) {
      adjusted = true;
      reason = `Lot ${lot} normalized to step ${lotStep} → ${rounded}`;
      lot = rounded;
    }
  }

  return { lot, adjusted, reason };
};

// ──── Update Registration Status (Phase) ────

export const updateRegistrationStatus = async (id: string, status: string) => {
  const { error } = await supabase
    .from("registrations")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
};

// ──── Archive / Delete ────

export const archiveRegistration = async (id: string) => {
  const { error } = await supabase
    .from("registrations")
    .update({ archived_at: new Date().toISOString() } as any)
    .eq("id", id);
  if (error) throw error;
};

export const unarchiveRegistration = async (id: string) => {
  const { error } = await supabase
    .from("registrations")
    .update({ archived_at: null } as any)
    .eq("id", id);
  if (error) throw error;
};

export const deleteRegistrationPermanently = async (id: string) => {
  // Delete related MT5 accounts and copy links first
  await supabase.from("mt5_accounts").delete().eq("registration_id", id);
  await supabase.from("copy_links").delete().eq("master_registration_id", id);
  await supabase.from("copy_links").delete().eq("slave_registration_id", id);
  const { error } = await supabase.from("registrations").delete().eq("id", id);
  if (error) throw error;
};

// ──── Admin Gift Account ────

export interface AdminGiftRegistration {
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  account_type: string;
  capital_tier: string;
  plan_capital: number;
  fee_expected: number;
  notes?: string;
}

export const createGiftRegistration = async (data: AdminGiftRegistration) => {
  const { data: reg, error } = await supabase
    .from("registrations")
    .insert({
      ...data,
      status: "pending",
      payment_status: "paid",
      paid_at: new Date().toISOString(),
      amount_paid: 0,
      payment_method: "cadeau",
      notes: data.notes || "Compte cadeau créé par l'admin",
    })
    .select()
    .single();
  if (error) throw error;
  return reg;
};

// ──── Fetch registrations by user_id ────

export const fetchRegistrationsByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("user_id", userId)
    .is("archived_at", null)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

// ──── CSV Export ────

export const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => {
        const val = row[h];
        const str = val === null || val === undefined ? "" : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      }).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
