"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";
import { supabase } from "@/config/supabase";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    title: "",
    message: "",
    type: "success",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            full_name: name,
          },
        },
      });

      console.log(data);

      if (error) throw error;

      setFeedback({
        title: "ລົງທະບຽນສຳເລັດ!",
        message:
          "ກະລຸນາກວດສອບອີເມວຂອງທ່ານເພື່ອຢືນຢັນການໃຊ້ງານ (ຖ້າມີການຕັ້ງຄ່າ Confirmation ໃນລະບົບ)",
        type: "success",
      });
      onOpen();
    } catch (error: any) {
      setFeedback({
        title: "ເກີດຂໍ້ຜິດພາດ",
        message: error.message,
        type: "error",
      });
      onOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    onOpenChange();
    if (feedback.type === "success") {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#141b3d]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
        <CardBody className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold font-['Bai_Jamjuree'] text-white">
              ສ້າງບັນຊີໃໝ່
            </h1>
            <p className="text-white/60">
              ກະລຸນากรອກຂໍ້ມູນເພື່ອເລີ່ມຕົ້ນໃຊ້ງານ Smart Parking
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 ml-1">
                ຊື່-ນາມສະກຸນ
              </label>
              <Input
                placeholder="สมชาย ใจดี"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/5 border-white/10 rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 ml-1">
                ອີເມວ
              </label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 ml-1">
                ລະຫັດຜ່ານ
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 rounded-2xl"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-2xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] mt-4"
            >
              {loading ? "ກຳລັງດຳເນີນການ..." : "ລົງທະບຽນ"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-white/60">
              ມີບັນຊີຢູ່ແລ້ວ?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:underline font-bold"
              >
                ເຂົ້າສູ່ລະບົບ
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Feedback Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalClose}
        backdrop="blur"
        className="bg-[#141b3d] border border-white/10 text-white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl font-bold font-['Bai_Jamjuree']">
                {feedback.type === "success" ? "🎉 " : "❌ "}
                {feedback.title}
              </ModalHeader>
              <ModalBody>
                <p className="text-white/80">{feedback.message}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className={
                    feedback.type === "success"
                      ? "bg-green-500 text-white font-bold"
                      : "bg-red-500 text-white font-bold"
                  }
                  onPress={onClose}
                >
                  ຕົກລົງ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
