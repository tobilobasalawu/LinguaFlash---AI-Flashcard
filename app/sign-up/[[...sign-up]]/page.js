import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="grid place-content-center w-full py-20 overflow-x-hidden">
      <div className="z-[1] absolute -top-[20svh] -left-[10svw] w-[200px] h-[200px] lg:w-[500px] lg:h-[500px] bg-primary blur-[50px] lg:blur-[100px] rounded-full"></div>
      <div className="z-[1] absolute -bottom-[20svh] -right-[10svw] w-[200px] h-[200px] lg:w-[500px] lg:h-[500px] bg-primary blur-[50px] lg:blur-[100px] rounded-full"></div>
      <SignUp forceRedirectUrl="/new" />
    </main>
  );
}
