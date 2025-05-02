"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const handleStart = async () => {
    if (user) {
      router.push("/game");
    } else {
      await signIn("google", { callbackUrl: "/game" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gradient_background} />
      <div className={styles.logo}>
        <Image
          src="/icon.png"
          alt="Truth or Dare Logo"
          width={80}
          height={80}
          priority
          className={styles.logo_image}
        />
      </div>
      <div className={styles.clouds}>
        <div className={`${styles.cloud} ${styles.cloud1}`} />
        <div className={`${styles.cloud} ${styles.cloud2}`} />
        <div className={`${styles.cloud} ${styles.cloud3}`} />
      </div>

      <main className={styles.main}>
        <div className={styles.content_section}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.title}>Truth or Dare</h1>
            <p className={styles.description}>
              The ultimate party game that brings friends together. Challenge,
              laugh, and create unforgettable moments with our modern take on
              the classic Truth or Dare game.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              <motion.button
                className={styles.google_button}
                onClick={handleStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {!user.name && (
                  <svg className={styles.google_icon} viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                <span>
                  {user ? `Continue as ${user.name}` : "Sign in with Google"}
                </span>
              </motion.button>
              {!user.name && (
                <motion.button
                  onClick={() => router.push("/login")}
                  className={styles.google_button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Continue with Email</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        <div className={styles.bottle_section}>
          <motion.div
            className={styles.bottle_container}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 2, type: "spring" }}
          >
            <Image
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/356608/bottle.png"
              alt="Spinning Bottle"
              width={200}
              height={400}
              className={styles.bottle_image}
              priority
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
