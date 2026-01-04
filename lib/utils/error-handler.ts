export function handleApiError(error: unknown): { message: string; status: number } {
  console.error("API Error:", error);
  if (error instanceof Error) {
    // Check for common Supabase or Postgres error patterns if needed
    return { message: error.message, status: 500 };
  }
  return { message: 'حدث خطأ غير متوقع في النظام', status: 500 };
}