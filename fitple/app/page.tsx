"use client";
import { Tab } from "@/components/Tab/Tab";
import FloatButton from "@/components/FloatButton/FloatButton";
import PopularPosts from "./RootComponent/PopularPosts";
export default function Home() {
    return (
        <div>
            <PopularPosts />
            <Tab />
            <FloatButton />
        </div>
    );
}
