import { extractText } from "@/services/pdfParser";
import { reviewResume } from "@/services/geminiService";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("resume");

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const resumeText =
      await extractText(buffer);

    const analysis =
      await reviewResume(resumeText);

    return Response.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}