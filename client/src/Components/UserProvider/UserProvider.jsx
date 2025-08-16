import useUserStore from "../../store/userStore";
function UserProvider({ children }) {
    const { isLoading } = useUserStore();
  
    if (isLoading) {
      return (
        <div>isLaoding...</div>
      );
    }
  
    return children;
  }
  
export default UserProvider;