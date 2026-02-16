import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
<<<<<<< HEAD
        <div
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{
                backgroundImage: 'url(/botanical-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-4 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-[#2d5f3f] mb-2">
                            Register 🌱
                        </h1>
                        <p className="text-gray-600">
                            Join the best app for your plants
                        </p>
                    </div>

                    <SignUp
                        path="/sign-up"
                        forceRedirectUrl="/dashboard"
                        appearance={{
                            elements: {
                                formButtonPrimary:
                                    'bg-[#2d5f3f] hover:bg-[#234d32] text-white transition-all duration-200',
                                card: 'shadow-none',
                                headerTitle: 'hidden',
                                headerSubtitle: 'hidden',
                                socialButtonsBlockButton:
                                    'border-gray-300 hover:bg-gray-50 transition-all duration-200',
                                formFieldInput:
                                    'border-gray-300 focus:border-[#2d5f3f] focus:ring-[#2d5f3f] rounded-lg',
                                footerActionLink:
                                    'text-[#2d5f3f] hover:text-[#234d32]',
                                identityPreviewEditButton:
                                    'text-[#2d5f3f] hover:text-[#234d32]',
                                formFieldLabel:
                                    'text-gray-700 font-medium',
                                dividerLine:
                                    'bg-gray-300',
                                dividerText:
                                    'text-gray-500',
                            },
                        }}
                    />
                </div>
            </div>
=======
        <div className="flex justify-center items-center py-24">
            <SignUp path="/sign-up" forceRedirectUrl="/dashboard" />
>>>>>>> c8f2ef0175ec69b4b6491dffbecacb2acba0b6d3
        </div>
    );
}
