"use client";
import { Tab } from "@/components/Tab/Tab";
import FloatButton from "@/components/FloatButton/FloatButton";
import PopularPosts from "./RootComponent/PopularPosts";
import Banner from "@/components/Banner/Banner";

export default function Home() {
    return (
        <div>
            <Banner />
            <PopularPosts />
            <Tab />
            <FloatButton />
        </div>
    );
}
