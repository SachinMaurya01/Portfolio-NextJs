"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { About, SocialHandle } from "../utils/interface";
import { cn } from "../utils/cn";
import Link from "next/link";
import { SectionHeading, TextReveal } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";
import { Input, Textarea } from "./ui/Input";

interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}
const Contact = ({ email, social_handle, about }: ContactProps) => {
  const [status, setStatus] = useState<"SENDING" | "DONE" | "ERROR" | "IDLE">(
    "IDLE"
  );
  const [statusText, setStatusText] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("ERROR");
    setStatusText("Currently email is not available. Please reach out to me via social media like Linkedin or Email.");
  };

  useEffect(() => {
    if (status === "DONE" || status === "ERROR") {
      const timer = setTimeout(() => {
        setStatus("IDLE");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <motion.section className="relative" id="contact">
      <AnimatePresence initial={false}>
        {status !== "IDLE" && (
          <motion.li
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={cn(
              "fixed top-4 right-4 p-2 px-4 w-[auto] z-50 h-16 rounded-xl bg-white flex items-center",
              status === "ERROR"
                ? "bg-red-500"
                : status === "DONE"
                ? "bg-green-400"
                : ""
            )}
          >
            <p className="text-white font-semibold">{statusText}</p>
          </motion.li>
        )}
      </AnimatePresence>
      <motion.div
        aria-hidden
        className="blob absolute top-20 right-0 -z-10 size-1/2 blur-[100px]"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="mx-auto max-w-6xl p-4 md:p-8 md:px-6">
        <SectionHeading className="">
          <SlideIn className="text-foreground/40">Interested in talking,</SlideIn>{" "}
          <br /> <SlideIn>let’s do it.</SlideIn>
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-10 md:pt-16">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <Transition className="w-full">
                <Input
                  id="name"
                  name="name"
                  placeholder="Full name"
                  className="border-0 border-b rounded-none"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Transition>
              <Transition className="w-full">
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="border-0 border-b rounded-none"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Enter the subject"
                  className="border-0 border-b rounded-none"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Textarea
                  className="min-h-[100px] rounded-none border-0 border-b resize-none"
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Transition>
            </div>
            <div>
              <Transition>
                <motion.button
                  whileHover="whileHover"
                  initial="initial"
                  className="border border-foreground/30 px-8 py-2 rounded-3xl relative overflow-hidden"
                  type="submit"
                >
                  <TextReveal className="uppercase">
                    {status === "SENDING" ? "Sending..." : "Submit"}
                  </TextReveal>
                </motion.button>
              </Transition>
            </div>
          </form>
          <div className="md:justify-self-end flex flex-col">
            <div className="pb-4">
              <Transition>
                <span className="text-foreground/90">Get in touch</span>
              </Transition>
              <div className="text-2xl md:text-4xl font-bold py-2">
                <Transition>
                  <TextReveal>{email}</TextReveal>
                </Transition>
              </div>
              <Transition>
                <div className="pb-1 text-foreground/80">{about.phoneNumber}</div>
              </Transition>
              <Transition>
                <div className="text-foreground/80">{about.address}</div>
              </Transition>
            </div>

            <div className="flex md:gap-8 gap-4 mt-auto md:pb-16">
              {social_handle.map((social, index) =>
                social.enabled ? (
                  <Transition
                    key={social._id}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={social.url} target="_blank">
                      <TextReveal>{social.platform}</TextReveal>
                    </Link>
                  </Transition>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-between md:px-8 px-2 py-4 text-sm">
        <Transition>
          <div>&copy; {new Date().getFullYear()} ThePortfolio</div>
        </Transition>
        <Transition>
          <p>
            developed by @
            <Link
              href={"https://www.linkedin.com/in/sachin-maurya-01/"}
              className="hover:underline"
            >
              Sachin Maurya
            </Link>
          </p>
        </Transition>
      </footer>
    </motion.section>
  );
};

export default Contact;
