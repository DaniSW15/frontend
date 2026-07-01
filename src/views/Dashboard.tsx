import { useContext, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { CollaboratorsView } from "@/features/collaborators";
import { AccountView } from "@/features/account";
import { SubUsersView } from "@/features/subusers";
import { PalindromesView } from "@/features/palindromes/views/PalindromesView";
import { PostsView } from "@/features/posts";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState<"employees" | "users" | "palindromes" | "posts" | "profile">("employees");

    return (
        <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === "employees" && <CollaboratorsView />}

            {activeTab === "profile" && <AccountView />}

            {activeTab === "users" && user?.role === "admin" && <SubUsersView />}

            {activeTab === "palindromes" && <PalindromesView />}

            {activeTab === "posts" && <PostsView />}
        </DashboardLayout>
    );
};

export default Dashboard;
