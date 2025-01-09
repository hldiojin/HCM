import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Home,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";
import confetti from "canvas-confetti";
import TextToImageGenerator from "./TextToVideoAI";
import ChatApp from "./Chatbot";
import Tour3D from "./Panorama";
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Globe, UserCircle, Calendar, Award, ArrowRight, Star,
  Heart, Users, Bookmark, GraduationCap, Target, Flag
} from 'lucide-react';

const TimelineEvent = ({ period, title, content, icon, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="flex gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
      whileHover={{ scale: 1.02 }}
    >
      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      <div className="flex-1">
        <div className="font-bold text-indigo-600">{period}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{content}</p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-indigo-600 hover:underline flex items-center gap-1"
        >
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
          <ArrowRight className="h-4 w-4" />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 overflow-hidden"
            >
              <ul className="space-y-2">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex gap-2">
                    <ArrowRight className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ValueCard = ({ title, icon, points }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg"
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>

    <ul className="space-y-3">
      {points.map((point, idx) => (
        <li key={idx} className="flex gap-2">
          <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const BodyContent = () => {
  const timeline = [
    {
      period: "1890-1911",
      title: "Hình thành tư tưởng yêu nước",
      content: "Thời kỳ tiếp thu truyền thống yêu nước và nhận thức về tình hình đất nước",
      icon: <BookOpen className="text-indigo-600" />,
      details: [
        "Sinh ra và lớn lên trong gia đình có truyền thống yêu nước",
        "Chứng kiến cảnh nước mất nhà tan",
        "Tiếp thu truyền thống yêu nước của dân tộc"
      ]
    },
    {
      period: "1911-1920",
      title: "Tìm đường cứu nước",
      content: "Hành trình ra đi tìm đường cứu nước và tiếp xúc với tư tưởng cách mạng",
      icon: <Globe className="text-indigo-600" />,
      details: [
        "Rời Việt Nam trên tàu Amiral Latouche Tréville",
        "Bôn ba khắp năm châu tìm hiểu các phong trào cách mạng",
        "Tiếp xúc với chủ nghĩa Marx-Lenin"
      ]
    },
    {
      period: "1921-1930",
      title: "Hình thành tư tưởng cách mạng Việt Nam",
      content: "Xây dựng nền tảng lý luận và đường lối cách mạng giải phóng dân tộc",
      icon: <Lightbulb className="text-indigo-600" />,
      details: [
        "Tham gia sáng lập Đảng Cộng sản Pháp",
        "Viết nhiều tác phẩm lý luận như 'Bản án chế độ thực dân Pháp'",
        "Xây dựng đường lối cách mạng giải phóng dân tộc gắn với chủ nghĩa xã hội"
      ]
    },
    {
      period: "1930-1945",
      title: "Lãnh đạo phong trào cách mạng",
      content: "Tổ chức phong trào cách mạng và chuẩn bị cho Tổng khởi nghĩa",
      icon: <Flag className="text-indigo-600" />,
      details: [
        "Thành lập Đảng Cộng sản Việt Nam tại Hội nghị hợp nhất 1930",
        "Lãnh đạo phong trào cách mạng, chống thực dân, phát xít",
        "Chuẩn bị tư tưởng và lực lượng cho Cách mạng Tháng Tám"
      ]
    },
    {
      period: "1945-1954",
      title: "Lãnh đạo kháng chiến chống thực dân Pháp",
      content: "Xây dựng nhà nước và lãnh đạo cuộc kháng chiến chống thực dân Pháp",
      icon: <ShieldCheck className="text-indigo-600" />,
      details: [
        "Lãnh đạo thành công Cách mạng Tháng Tám 1945",
        "Thành lập nước Việt Nam Dân chủ Cộng hòa",
        "Chỉ đạo cuộc kháng chiến chống thực dân Pháp, giành thắng lợi với Điện Biên Phủ"
      ]
    },
    {
      period: "1954-1969",
      title: "Xây dựng và bảo vệ miền Bắc, đấu tranh thống nhất đất nước",
      content: "Xây dựng chủ nghĩa xã hội ở miền Bắc, đấu tranh giải phóng miền Nam",
      icon: <Home className="text-indigo-600" />,
      details: [
        "Lãnh đạo công cuộc xây dựng chủ nghĩa xã hội tại miền Bắc",
        "Ủng hộ phong trào đấu tranh giải phóng miền Nam",
        "Đề cao tinh thần hòa bình và hợp tác quốc tế"
      ]
    }
  ];


  const values = [
    {
      title: "Đối với cách mạng Việt Nam",
      icon: <Flag className="text-red-600" />,
      points: [
        "Xác định đường lối cách mạng đúng đắn",
        "Tạo cơ sở lý luận vững chắc",
        "Xây dựng hệ thống chính trị nhân dân"
      ]
    },
    {
      title: "Đối với tiến bộ nhân loại",
      icon: <Globe className="text-red-600" />,
      points: [
        "Góp phần vào phong trào giải phóng dân tộc",
        "Làm phong phú lý luận cách mạng vô sản",
        "Đề cao giá trị hòa bình và nhân văn"
      ]
    }
  ];
  const [activeStep, setActiveStep] = useState(null);

  const fireConfetti = () => {
    // Bắn pháo hoa từ nhiều hướng
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Bắn từ góc trái
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0, y: 1 },
      });

      // Bắn từ góc phải
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 1, y: 1 },
      });

      // Bắn từ giữa
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.5, y: 0.7 },
      });
    }, 250);

    // Thêm hiệu ứng mưa vàng
    const count = 200;
    const defaults2 = {
      origin: { y: 0.7 },
      colors: ["#FFD700", "#FFA500", "#FF0000"], // Màu vàng, cam, đỏ
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults2,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const toggleStep = (index) => {
    setActiveStep(activeStep === index ? null : index);
    if (index === 5 && activeStep !== index) {
      fireConfetti();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Hero Section */}
      <div className="relative bg-black h-[100vh] md:h-[90vh] group overflow-hidden">
        {/* Container chính */}
        <img
          src="https://1900.com.vn/storage/uploads/images/banners/1858/YVDicfx89Fjpac4MR1PcRdqHnLjYdE9NaTZCKnX8_903x430.png"
          alt="Cơ sở hình thành tư tưởng Hồ Chí Minh"
          className="w-full h-full object-cover object-center opacity-70 transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />

        {/* Text content */}
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
            Cơ sở hình thành tư tưởng Hồ Chí Minh
          </h1>
          <p className="max-w-2xl text-lg opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            Tư tưởng Hồ Chí Minh hình thành dựa trên nhiều cơ sở quan trọng
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Cơ sở hình thành */}
        <section className="mb-20">
          <motion.h2
            className="text-3xl font-bold mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Cơ sở hình thành tư tưởng Hồ Chí Minh
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cơ sở khách quan */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-8 w-8 text-indigo-600" />
                <h3 className="text-xl font-bold">Cơ sở khách quan</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h4 className="font-semibold mb-2">Truyền thống văn hóa dân tộc</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>Tinh thần yêu nước, đoàn kết</li>
                    <li>Truyền thống nhân nghĩa, tinh thần cộng đồng</li>
                  </ul>
                </div>

                <div className="border-l-4 border-indigo-600 pl-4">
                  <h4 className="font-semibold mb-2">Tinh hoa văn hóa nhân loại</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>Phương Đông: Nho giáo, Phật giáo</li>
                    <li>Phương Tây: Cách mạng Pháp, Mỹ, Chủ nghĩa Marx-Lenin</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Cơ sở chủ quan */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <UserCircle className="h-8 w-8 text-indigo-600" />
                <h3 className="text-xl font-bold">Cơ sở chủ quan</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h4 className="font-semibold mb-2">Tư duy và năng lực sáng tạo</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>Vận dụng sáng tạo chủ nghĩa Marx-Lenin</li>
                    <li>Tinh thần học hỏi và thực tiễn</li>
                  </ul>
                </div>

                <div className="border-l-4 border-indigo-600 pl-4">
                  <h4 className="font-semibold mb-2">Phẩm chất đạo đức và nhân cách</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>Lòng yêu nước thương dân</li>
                    <li>Gắn bó mật thiết với nhân dân</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quá trình phát triển */}
        <section className="mb-20">
          <motion.h2
            className="text-3xl font-bold mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quá trình hình thành và phát triển
          </motion.h2>


          <div className="space-y-8">
            {timeline.map((stage, index) => (
              <TimelineEvent key={index} {...stage} />
            ))}
          </div>
        </section>

        {/* Giá trị tư tưởng */}
        <section>
          <motion.h2
            className="text-3xl font-bold mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Giá trị tư tưởng Hồ Chí Minh
          </motion.h2>


          <div className="mb-18">
            <h2 className="text-3xl font-bold mb-6">Nguồn gốc tư tưởng</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <ArrowRight className="mt-1 text-red-600" />
                  <span>
                    1. Giá trị truyền thống dân tộc: Tư tưởng nhân nghĩa, yêu nước, thương dân.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="mt-1 text-red-600" />
                  <span>
                    2. Tinh hoa văn hoá nhân loại: Tiếp thu tổng hợp tinh hoa tư tưởng đông - tây.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="mt-1 text-red-600" />
                  <span>
                    3. Chủ nghĩa Mác - Lê-nin: Nền tảng tư tưởng, kim chỉ nam cho hành động cách mạng.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </section>


        {/* Phần kết luận cập nhật */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-red-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Đối với sự phát triển, tiến bộ của nhân loại
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  Góp phần vào phong trào giải phóng dân tộc:<br />
                  Tư tưởng Hồ Chí Minh là ngọn cờ dẫn đường cho nhiều phong trào cách mạng trên thế giới.

                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  Đóng góp cho lý luận cách mạng vô sản:<br />
                  Làm phong phú thêm chủ nghĩa Marx-Lenin qua việc vận dụng vào điều kiện thuộc địa.

                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  Đề cao giá trị nhân văn và hòa bình:<br />
                  Tư tưởng về hòa bình, hợp tác và sự bình đẳng giữa các dân tộc.

                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  Định hướng phát triển toàn cầu:<br />
                  Đặt nền tảng cho sự đoàn kết quốc tế và xây dựng một thế giới công bằng, tiến bộ.

                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg overflow-hidden">
            <Tour3D />
          </div>
        </div>

        <div className="mt-12 mb-12">
          <h2 className="text-3xl font-bold mb-6">Hỏi đáp với AI</h2>
          <ChatApp />
        </div>

        {/* AI */}
        <TextToImageGenerator />
      </div>
    </div>
  );
};

export default BodyContent;
