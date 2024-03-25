import { useQuery } from "@tanstack/react-query";
import { getLoggedinUser } from "../../services/apiAuth.js";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedinUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
