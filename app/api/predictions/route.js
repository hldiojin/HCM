import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST;

export async function POST(request) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error(
        "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
      );
    }

    const body = await request.json();
    if (!body.prompt) {
      return NextResponse.json(
        { detail: "Prompt is required" },
        { status: 400 }
      );
    }

    const { prompt } = body;

    const options = {
      version:
        "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
      input: { prompt },
    };

    if (WEBHOOK_HOST) {
      options.webhook = `${WEBHOOK_HOST}/api/webhooks`;
      options.webhook_events_filter = ["start", "completed"];
    }

    const prediction = await replicate.predictions.create(options);

    if (prediction?.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
    console.error("Error creating prediction:", error);
    return NextResponse.json(
      { detail: "Failed to create prediction" },
      { status: 500 }
    );
  }
}
