"use client";
import Image from "next/image";
import learnSlider from "@/data/learnSlider";
import Marquee from "react-fast-marquee";

export default function LearnSlider() {
    return (
        <section className="overflow-hidden">
            <Marquee speed={60}>
                <div className="flex gap-12 lg:gap-20 px-5 md:px-10 py-2 md:p-3">
                    {learnSlider.map((data) => {
                        return (
                            <div
                                key={data.text}
                                className="flex items-center gap-2">
                                <Image
                                    className="mt-3"
                                    src={`${data.flag}`}
                                    alt={`${data.flagName}`}
                                    width={28}
                                    height={20}
                                />
                                <h2 className="font-dela-gothic-one text-xl lg:text-2xl text-white tracking-normal !leading-none whitespace-nowrap">
                                    {data.text}
                                </h2>
                            </div>
                        );
                    })}
                </div>
            </Marquee>
        </section>
    );
}
