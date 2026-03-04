import { supabase } from "@/integrations/supabase/client";

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
