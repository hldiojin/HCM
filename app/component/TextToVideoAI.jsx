import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const prompts = {
  "Toàn cảnh chiến trường Điện Biên Phủ":
    "Aerial view of Dien Bien Phu battlefield 1954, valley surrounded by mountains, French fortifications, trenches, historical accurate, realistic style",
  "Chiến thắng lịch sử":
    "Vietnamese victory at Dien Bien Phu 1954, soldiers raising flag, captured French bunkers, emotional moment, historical photograph style",
  "Đường hầm và chiến hào":
    "Underground tunnels and trenches at Dien Bien Phu, Vietnamese soldiers, artillery transport, detailed engineering, dark atmosphere",
  "Pháo binh trên đồi":
    "Vietnamese artillery positions on hills overlooking Dien Bien Phu, camouflaged guns, soldiers in action, dramatic lighting",
  "Đời sống chiến sĩ":
    "Daily life of Vietnamese soldiers at Dien Bien Phu, carrying supplies, cooking, resting in bunkers, documentary style",
};

const TextToImageGenerator = () => {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [error, setError] = useState("");
  const [predictionId, setPredictionId] = useState(null);

  const handleGenerate = async () => {
    if (!selectedPrompt) {
      setError("Vui lòng chọn một chủ đề");
      return;
    }

    setLoading(true);
    setError("");
    setGeneratedImage("");

    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompts[selectedPrompt],
        }),
      });

      if (!response.ok) throw new Error("Lỗi khi tạo prediction");

      const prediction = await response.json();
      setPredictionId(prediction.id);

      // Poll kết quả
      while (true) {
        const statusResponse = await fetch(`/api/predictions/${prediction.id}`);
        const result = await statusResponse.json();

        if (result.status === "succeeded") {
          setGeneratedImage(result.output[0]);
          break;
        } else if (result.status === "failed") {
          throw new Error("Không thể tạo hình ảnh");
        }

        // Đợi 1 giây trước khi poll lại
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi tạo hình ảnh. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Tạo Hình Ảnh Chiến Thắng Điện Biên Phủ
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt-select" className="text-sm font-medium">
            Chọn chủ đề:
          </label>
          <select
            id="prompt-select"
            value={selectedPrompt}
            onChange={(e) => setSelectedPrompt(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="" disabled>
              Chọn một chủ đề
            </option>
            {Object.keys(prompts).map((prompt) => (
              <option key={prompt} value={prompt}>
                {prompt}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !selectedPrompt}
          className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
            loading || !selectedPrompt
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="inline-block h-4 w-4 animate-spin mr-2" />
              Đang tạo hình ảnh...
            </>
          ) : (
            "Tạo hình ảnh"
          )}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {generatedImage && (
          <div className="mt-4">
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        <p>Lưu ý:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Hình ảnh được tạo có thể không hoàn toàn chính xác về mặt lịch sử
          </li>
          <li>Chất lượng hình ảnh phụ thuộc vào API và prompt được sử dụng</li>
          <li>Có thể mất vài giây để tạo hình ảnh</li>
        </ul>
      </div>
    </div>
  );
};

export default TextToImageGenerator;
