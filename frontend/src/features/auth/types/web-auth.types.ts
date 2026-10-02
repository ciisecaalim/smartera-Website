export type WebAuthUser = {
  id: string;
  email: string;
  phone: string | null;
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "DISABLED";
  capabilities: Array<"CUSTOMER" | "STUDENT">;
  profile: { fullName: string; accountType: "INDIVIDUAL" | "ORGANIZATION"; organizationName: string | null; city: string | null; address: string | null; avatarUrl: string | null } | null;
  studentProfile?: { fullName: string; address: string | null; avatarUrl: string | null; status: WebStudentStatus; studentCode: string | null; rejectionReason: string | null } | null;
};

export type WebStudentStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED";
export type WebStudentProfile = {
  id: string; webUserId: string; name: string; email: string; phone: string | null; avatarUrl: string | null;
  status: WebStudentStatus; studentCode: string | null; rejectionReason: string | null; createdAt: string; updatedAt: string;
  member: null | { id: string; memberCode: string; fullName: string; status: string; memberPath: string; course: null | { id: string; title: string; description?: string | null }; enrollments: Array<{ id: string; enrolledAt: string; class: { id: string; name: string; startDate: string; endDate?: string | null; location?: string | null; status: string; course: { id: string; title: string; description?: string | null } } }> };
};

export type WebAuthResult = { token: string; user: WebAuthUser };
export type PublicAcademyCourse = { id: string; title: string; description: string | null; imageUrl: string | null; monthlyFee: string | null };
export type PublicStudentEnrollment = { id: string; status: "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED" | "COMPLETED" | "CANCELLED"; requestedAt: string; startDate: string | null; rejectionReason: string | null; course: PublicAcademyCourse; billingPeriods: Array<{ id: string; periodNumber: number; periodStart: string; periodEnd: string; dueDate: string; amountDue: string; amountPaid: string; balance: string; status: string; payments: Array<{ id: string; amount: string; paidAt: string | null; method: string; receipt?: { receiptNumber: string } | null }> }> };
