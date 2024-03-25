import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPI } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useSignup() {
  const { isLoading, mutate: signUp } = useMutation({
    mutationFn: signUpAPI,
    onSuccess: (data) => {
      toast.success(
        "User created successfully! \n Please verify the account from user's email address"
      );
    },
    onError: () => toast.error("Failed to create user"),
  });
  return { isLoading, signUp };
}
