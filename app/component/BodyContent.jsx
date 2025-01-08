import React, { useState } from "react";
import {
  Bookmark,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import TextToImageGenerator from "./TextToVideoAI";
import ChatApp from "./Chatbot";
import Tour3D from "./Panorama";

const TimelineEvent = ({ year, title, content, significance, media }) => (
  <div className="flex gap-8 mb-16 group hover:transform hover:scale-102 transition-all duration-300">
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 
        flex items-center justify-center text-white shadow-lg transform 
        group-hover:rotate-12 transition-all duration-300">
        <Bookmark size={24} className="group-hover:scale-110" />
      </div>
      <div className="w-1 flex-1 bg-gradient-to-b from-indigo-200 to-purple-200 
        group-hover:from-indigo-300 group-hover:to-purple-300"></div>
    </div>
    <div className="flex-1 backdrop-blur-sm bg-white/5 p-6 rounded-2xl 
      shadow-xl hover:shadow-2xl transition-all duration-300
      border border-gray-100/20">
      <div className="text-lg font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-indigo-500 to-purple-600">{year}</div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-black">{title}</h3>
      {media && (
        <div className="mb-4 rounded-xl overflow-hidden transform 
          hover:scale-[1.02] transition-all duration-300">
          {media.type === "video" ? (
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${media.url}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>
          ) : (
            <img
              src={media.url}
              alt={title}
              className="w-full h-96 object-cover"
            />
          )}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
        <div className="prose max-w-none">{content}</div>
      </div>
      {significance && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-bold mb-3">Ý nghĩa:</h4>
          <ul className="space-y-2">
            {significance.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <ArrowRight className="mt-1 flex-shrink-0 text-red-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const BodyContent = () => {
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
    // Khi người dùng click vào mục "Chiến thắng" (index 5)
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

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Bối cảnh */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Cơ sở khả quan</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  1.Bối cảnh lịch sử trong nước: Cuối thế kỷ 19 đầu thế kỷ 20, xã hội Việt Nam bị thực dân Pháp đô hộ, phong trào cải cách của các sĩ phu yêu nước thất bại.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  2.Bối cảnh quốc tế: Sự phát triển mạnh mẽ của chủ nghĩa tư bản, phong trào công nhân quốc tế dâng cao, sự ra đời của chủ nghĩa Mác - Lê-nin.
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* Bối cảnh */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Cơ sở chủ quan</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  1.Truyền thống gia đình: Sinh ra trong gia đình có truyền thống yêu nước, cách mạng.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  2.Phẩm chất cá nhân: Tinh thần ham học hỏi, tích cực hành động, tự rèn luyện.
                </span>
              </li>
            </ul>
          </div>
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
        </div>

        <TimelineEvent
          year="Giai đoạn 1890 - 1911 "
          title="Thời kỳ hình thành tả quan sơ khởi về con đường giải phóng dân tộc."
          media={{
            type: "image",
            url: "https://lh3.googleusercontent.com/proxy/r1XsFsyyREZAQGcJIcXmKdvRxYS-R6D8RwZZyF3liHjIeQCO7802KW9_qRFo8fAnrGjYuO4CFcNkmj9iVEWElSMwHVrhUoF6u17kSv3ShcDDt6neuBrecw",
          }}
          
          content={
            <div>
              <p>
              1.Hồ Chí Minh sinh ra và lớn lên trong bối cảnh xã hội Việt Nam bị đô hộ. <br/>
              2.Chứng kiến sự thất bại của các phong trào cải cách, khởi nghĩa.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Tiêu diệt một phần sinh lực địch</li>
                <li>Giải phóng vùng biên giới quan trọng</li>
                <li>Khai thông đường liên lạc quốc tế</li>
              </ul>
            </div>
          }
          significance={[
            "Quân sự: Tiêu diệt và làm tan rã một số lớn sinh lực địch, mở rộng vùng giải phóng từ biên giới Việt-Trung xuống đồng bằng Bắc Bộ",
            "Chiến lược: Mở thông tuyến đường liên lạc quốc tế với Trung Quốc và Liên Xô, tạo điều kiện thuận lợi cho việc tiếp nhận viện trợ",
            "Chính trị: Nâng cao vị thế và uy tín của Việt Nam trên trường quốc tế",
            "Là chiến dịch lớn đầu tiên và là bước ngoặt quan trọng trong cuộc kháng chiến",
          ]}
        />

        <TimelineEvent
          year="1951"
          title="Đại hội Đảng lần thứ II"
          media={{
            type: "image",
            url: "https://tuyenquang.dcs.vn/Image/Large/2021115171721_10682.jpg",
          }}
          content={
            <div>
              <p>
                Tổ chức tại Tuyên Quang, Đại hội đã đạt được những quyết định
                quan trọng:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Khẳng định rõ đường lối kháng chiến của Đảng</li>
                <li>Quyết định đổi tên Đảng thành Đảng Lao động Việt Nam</li>
                <li>Thông qua Chính cương Đảng, sách lược vắn tắt</li>
                <li>Xác định mục tiêu chiến đấu rõ ràng</li>
              </ul>
            </div>
          }
          significance={[
            "Khẳng định vai trò lãnh đạo của Đảng trong kháng chiến",
            "Thống nhất đường lối đấu tranh cách mạng",
            "Nâng cao uy tín của Đảng trên trường quốc tế",
            "Tạo cơ sở chính trị vững chắc cho cuộc kháng chiến",
          ]}
        />

        <TimelineEvent
          year="1951-1952"
          title="Chiến dịch Hòa Bình"
          media={{
            type: "image",
            url: "https://i.ytimg.com/vi/ufde4mvqU58/maxresdefault.jpg",
          }}
          content={
            <div>
              <p>
                Chiến dịch được tiến hành từ tháng 12/1951 đến tháng 2/1952
                nhằm:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Mở rộng vùng giải phóng</li>
                <li>Tiêu diệt sinh lực địch tại khu vực Hòa Bình</li>
                <li>
                  Đẩy mạnh chiến lược đánh tiêu hao và phân tán lực lượng địch
                </li>
              </ul>
            </div>
          }
          significance={[
            "Quân sự: Làm suy yếu lực lượng cơ động chiến lược của địch",
            "Chiến lược: Phá vỡ kế hoạch của Pháp về tuyến phòng thủ Hòa Bình",
            "Đảm bảo sự liên lạc và tiếp viện giữa các khu vực chiến lược",
            "Tinh thần: Củng cố niềm tin của quân và dân ta vào khả năng chiến thắng",
          ]}
        />

        <TimelineEvent
          year="1953-1954"
          title="Chiến dịch Đông Xuân"
          media={{
            type: "image",
            url: "https://hungyen.dcs.vn/ckfinder/userfiles/files/1(579).jpg",
          }}
          content={
            <div>
              <p className="font-bold mb-2">Chiến dịch Đông Xuân 1953-1954:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mở đầu bằng chiến dịch Thượng Lào (12/1953 - 1/1954)</li>
                <li>
                  Tiếp theo là chiến dịch Tây Bắc - Điện Biên Phủ (1-5/1954)
                </li>
                <li>
                  Song song là chiến dịch Trung Lào và chiến dịch đường số 9 -
                  Khe Sanh
                </li>
                <li>
                  Tổng hợp các hoạt động quân sự trên toàn chiến trường Đông
                  Dương
                </li>
              </ul>
            </div>
          }
          significance={[
            "Quân sự: Phân tán và tiêu diệt lực lượng địch trên nhiều mặt trận",
            "Chiến lược: Phá vỡ kế hoạch Nava của Pháp ngay từ bước đầu",
            "Tạo thế và lực cho chiến dịch Điện Biên Phủ",
            "Mở rộng vùng giải phóng ở Tây Bắc và Thượng Lào",
          ]}
        />

        <TimelineEvent
          year="1954"
          title="Chiến dịch Điện Biên Phủ"
          media={{
            type: "video",
            url: "_PP8KGoDX9k",
          }}
          content={
            <div>
              <h2 className="font-bold mb-2">CÁC CÔNG TÁC CHUẨN BỊ</h2>
              <ul className="space-y-2">
                <li
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => toggleStep(1)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="text-red-600" />
                    <span className="font-bold">Chuẩn bị chiến lược</span>
                  </div>
                  {activeStep === 1 ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </li>
                {activeStep === 1 && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li className="font-bold">Đánh giá tình hình:</li>
                    <ul className="list-disc pl-6">
                      <li>
                        Đánh giá thực tế của địch và ta, nhận thấy Điện Biên Phủ
                        là vị trí quan trọng.
                      </li>
                      <li>
                        Pháp xây dựng Điện Biên Phủ thành tập đoàn cứ điểm mạnh
                        mẽ.
                      </li>
                    </ul>
                    <li className="font-bold">Xác định mục tiêu:</li>
                    <ul className="list-disc pl-6">
                      <li>
                        Tiêu diệt tập đoàn cứ điểm Điện Biên Phủ và buộc Pháp
                        đàm phán chấm dứt chiến tranh.
                      </li>
                    </ul>
                  </ul>
                )}

                <li
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => toggleStep(2)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="text-red-600" />
                    <span className="font-bold">Chuẩn bị hậu cần</span>
                  </div>
                  {activeStep === 2 ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </li>
                {activeStep === 2 && (
                  <ul className="list-disc pl-6">
                    <li className="font-bold">
                      Huy động lực lượng và vật chất:
                    </li>
                    <ul className="list-disc pl-6">
                      <li>
                        Hàng trăm nghìn dân công, bộ đội vận chuyển lương thực,
                        vũ khí từ hậu phương.
                      </li>
                      <li>
                        Sử dụng tối đa đường mòn Hồ Chí Minh để chuyển vận hậu
                        cần.
                      </li>
                    </ul>
                    <li className="font-bold">Xây dựng hệ thống kho tàng:</li>
                    <ul className="list-disc pl-6">
                      <li>
                        Xây dựng kho tàng dọc tuyến đường để đảm bảo cung cấp
                        liên tục cho quân đội.
                      </li>
                    </ul>
                  </ul>
                )}

                <li
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => toggleStep(3)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="text-red-600" />
                    <span className="font-bold">Chuẩn bị tiến công</span>
                  </div>
                  {activeStep === 3 ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </li>
                {activeStep === 3 && (
                  <ul className="list-disc pl-6">
                    <li className="font-bold">Tổ chức lực lượng:</li>
                    <ul className="list-disc pl-6">
                      <li>
                        Phân công cụ thể cho các đơn vị bộ binh, pháo binh, công
                        binh.
                      </li>
                      <li>
                        Huấn luyện kỹ thuật và chiến thuật để thích nghi với
                        điều kiện chiến đấu.
                      </li>
                    </ul>
                    <li className="font-bold">
                      Chiến thuật “vây lấn, đánh lấn”:
                    </li>
                    <ul className="list-disc pl-6">
                      <li>
                        Tiến hành vây hãm từng bước, lấn dần vào các cứ điểm của
                        địch.
                      </li>
                    </ul>
                  </ul>
                )}

                <li
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => toggleStep(4)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="text-red-600" />
                    <span className="font-bold">Tiến công</span>
                  </div>
                  {activeStep === 4 ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </li>
                {activeStep === 4 && (
                  <ul className="list-disc pl-6">
                    <li className="font-bold">
                      Đợt tiến công thứ nhất (13-17/3/1954):
                    </li>
                    <ul className="list-disc pl-6">
                      <li>
                        Mở màn, phá vỡ phòng tuyến ngoại vi, tập trung vào các
                        cứ điểm Him Lam và Độc Lập.
                      </li>
                    </ul>

                    <li className="font-bold">
                      Đợt tiến công thứ hai (30/3 - 26/4/1954):
                    </li>
                    <ul className="list-disc pl-6">
                      <li>
                        Chiếm các cứ điểm trọng yếu ở trung tâm và phía đông nam
                        như C1, C2, D1, và E1.
                      </li>
                    </ul>

                    <li className="font-bold">
                      Đợt tiến công thứ ba (1-7/5/1954):
                    </li>
                    <ul className="list-disc pl-6">
                      <li>
                        Tổng tấn công, tiêu diệt hoàn toàn tập đoàn cứ điểm,
                        đánh chiếm Đồi A1 và Hồng Cúm.
                      </li>
                    </ul>
                  </ul>
                )}

                <li
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => toggleStep(5)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="text-red-600" />
                    <span className="font-bold">Chiến thắng</span>
                  </div>
                  {activeStep === 5 ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </li>
                {activeStep === 5 && (
                  <ul className="list-disc pl-6">
                    <li>
                      Ngày 7/5/1954, tập đoàn cứ điểm Điện Biên Phủ bị tiêu diệt
                      hoàn toàn, quân Pháp đầu hàng.
                    </li>
                    <li>
                      Chiến thắng chấn động dư luận thế giới, buộc Pháp ký Hiệp
                      định Genève.
                    </li>
                  </ul>
                )}
              </ul>
            </div>
          }
          significance={[
            "Chiến thắng Điện Biên Phủ không chỉ là một chiến thắng quân sự vang dội mà còn là một chiến thắng về mặt chính trị và ngoại giao.",
            "Nó chứng minh tinh thần quyết tâm và khả năng tổ chức, chiến đấu của quân đội và nhân dân Việt Nam dưới sự lãnh đạo của Đảng và Chủ tịch Hồ Chí Minh.",
            "Chiến thắng này đã trở thành biểu tượng của ý chí quật cường và khát vọng tự do của dân tộc Việt Nam.",
          ]}
        />

        {/* Phần kết luận cập nhật */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-red-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Thắng lợi và ý nghĩa lịch sử
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  Chiến thắng Điện Biên Phủ và thắng lợi của chiến dịch Đông
                  Xuân 1953-1954 đã buộc Pháp phải ký Hiệp định Genève, chấm dứt
                  chiến tranh ở Đông Dương.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  Hiệp định Genève (1954) công nhận độc lập, chủ quyền, thống
                  nhất và toàn vẹn lãnh thổ của ba nước Đông Dương.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  Miền Bắc được hoàn toàn giải phóng, tạo cơ sở vững chắc cho
                  cuộc đấu tranh thống nhất nước nhà.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 text-red-600" />
                <span>
                  Thắng lợi là kết quả của đường lối đúng đắn của Đảng, sự lãnh
                  đạo tài tình của Chủ tịch Hồ Chí Minh và sức mạnh đại đoàn kết
                  toàn dân tộc.
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
