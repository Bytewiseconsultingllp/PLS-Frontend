import { toast } from "react-hot-toast"

export const useMessage = () => {
  const successMessage = (message: string) => {
    toast.success(message)
  }

  const errorMessage = (message: string) => {
    toast.error(message)
  }

  return { successMessage, errorMessage }
}
