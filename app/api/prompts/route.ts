import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { Prompt } from "@/lib/models/Prompt";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || !session.user) { // Add this check
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const prompts = await Prompt.find({ userId: session.user.email })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(prompts);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) { // Add this check
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, prompt } = await request.json();
    await connectDB();

    const newPrompt = await Prompt.create({
      title,
      prompt,
      userId: session.user.email,
    });

    return NextResponse.json(newPrompt);
  } catch (error) {
    console.error("Error creating prompt:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
