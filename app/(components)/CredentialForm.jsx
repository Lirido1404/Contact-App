// Dans CredentialForm.jsx
"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function CredentialForm({ signUp }) {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleError = () => {
    toast({
      variant: "destructive",
      title: (
        <h3 className="text-white font-bold">
          Identifiants incorrects, veuillez réessayer.
        </h3>
      ),
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
    });

    if (result.error) {
      handleError();
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <AnimatePresence>
      {signUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            exit={{ opacity: 0 }}
            className="w-[80%] mx-auto h-[2px] bg-white rounded-full "
          ></motion.div>

          <form onSubmit={handleSignIn} className="flex flex-col gap-3 mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              exit={{ opacity: 0 }}
              drag
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="password" className="text-white">
                  Mot de passe
                </Label>
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              exit={{ opacity: 0 }}
            >
              <Input
                type="submit"
                value={"Se connecter"}
                className="border-[#25723B] font-bold flex justify-center text-white hover:bg-[#25723B] ease-in-out duration-200 cursor-pointer"
              />
            </motion.div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CredentialForm;
