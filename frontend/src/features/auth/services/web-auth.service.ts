import type { PublicAcademyCourse, PublicStudentEnrollment, WebAuthResult, WebAuthUser, WebStudentProfile } from "@/features/auth/types/web-auth.types";

export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";
const TOKEN_KEY = "smartera_web_auth_token";
type ApiSuccess<T> = { success: true; message: string; data: T };
type ApiFailure = { success: false; message: string; errors?: Array<{ retryAfterSeconds?: number }> };

export class WebAuthError extends Error {
  constructor(message: string, public status: number, public retryAfterSeconds?: number) { super(message); }
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);
  const payload = (await response.json().catch(() => ({ success: false, message: "Unable to process the server response." }))) as ApiSuccess<T> | ApiFailure;
  if (!response.ok || !payload.success) {
    const retryAfterSeconds = !payload.success ? payload.errors?.[0]?.retryAfterSeconds : undefined;
    throw new WebAuthError(payload.message || "Request failed", response.status, retryAfterSeconds);
  }
  return payload.data;
}

export async function registerWebCustomer(input: {
  fullName: string; email: string; phone: string; password: string; confirmPassword: string; address: string; avatar?: File;
}) {
  const body = new FormData();
  body.set("fullName", input.fullName);
  body.set("email", input.email);
  body.set("phone", input.phone);
  body.set("password", input.password);
  body.set("confirmPassword", input.confirmPassword);
  body.set("address", input.address);
  if (input.avatar) body.set("avatar", input.avatar);
  return request<WebAuthUser>("/web/auth/register", { method: "POST", body });
}

export async function registerWebStudent(input: { fullName: string; phone: string; address: string; email: string; password: string; confirmPassword: string; avatar?: File }) {
  const body = new FormData();
  Object.entries(input).forEach(([key, value]) => { if (key !== "avatar" && typeof value === "string") body.set(key, value); });
  if (input.avatar) body.set("avatar", input.avatar);
  return request<WebAuthUser>("/web/auth/register/student", { method: "POST", body });
}

export async function loginWebUser(input: { email: string; password: string }) {
  const result = await request<WebAuthResult>("/web/auth/login", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input),
  });
  localStorage.setItem(TOKEN_KEY, result.token);
  return result;
}

export async function getCurrentWebUser() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  try {
    return await request<WebAuthUser>("/web/auth/me", { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    if (error instanceof WebAuthError && error.status === 401) localStorage.removeItem(TOKEN_KEY);
    throw error;
  }
}

export async function logoutWebUser() {
  const token = localStorage.getItem(TOKEN_KEY);
  try {
    if (token) await request<null>("/web/auth/logout", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
  } finally {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export async function updateWebUserProfile(input: { fullName: string; phone: string; address: string; avatar?: File; removeAvatar?: boolean }) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) throw new WebAuthError('Authentication is required.', 401);
  const body = new FormData();
  body.set('fullName', input.fullName);
  body.set('phone', input.phone);
  body.set('address', input.address);
  body.set('removeAvatar', input.removeAvatar ? 'true' : 'false');
  if (input.avatar) body.set('avatar', input.avatar);
  return request<WebAuthUser>('/web/auth/profile', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
}

export function resolveAvatarUrl(avatarUrl?: string | null) {
  if (!avatarUrl) return null;
  return avatarUrl.startsWith("http") ? avatarUrl : `${API_URL.replace(/\/api\/?$/, "")}${avatarUrl}`;
}

function authenticatedRequest<T>(path: string, init: RequestInit = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) throw new WebAuthError("Authentication is required.", 401);
  return request<T>(path, { ...init, headers: { ...init.headers, Authorization: `Bearer ${token}` } });
}
export function getCurrentStudent() { return authenticatedRequest<WebStudentProfile | null>("/web/student/me"); }
export function submitStudentRegistration(memberCode: string) { return authenticatedRequest<WebStudentProfile>("/web/student/registration", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ memberCode }) }); }
export function getStudentAcademics() { return authenticatedRequest<WebStudentProfile>("/web/student/academics"); }
export function listPublicAcademyCourses() { return authenticatedRequest<PublicAcademyCourse[]>("/web/student/courses"); }
export function requestStudentCourse(courseId: string) { return authenticatedRequest<PublicStudentEnrollment>("/web/student/course-requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ courseId }) }); }
export function listStudentEnrollments() { return authenticatedRequest<PublicStudentEnrollment[]>("/web/student/enrollments"); }
