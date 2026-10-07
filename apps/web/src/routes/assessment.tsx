import { createFileRoute } from "@tanstack/react-router";
import { createSoftwareApplicationSchema } from "../lib/schema";
import { createSeoMeta } from "../lib/seo";
import AssessmentWizard from "#/modules/assessment/components/assessment-wizard";

export const Route = createFileRoute("/assessment")({
	head: () =>
		createSeoMeta({
			title: "Free Energy Assessment | Gavikina Energy",
			description:
				"Complete a ten-minute energy assessment for your property. Review system recommendations and fuel cost comparisons before booking an inspection.",
			path: "/assessment",
			jsonLd: createSoftwareApplicationSchema({
				name: "Solar Energy Assessment Wizard",
				description:
					"Online electrical audit wizard providing system recommendations and generator fuel cost comparisons for Nigerian properties.",
				path: "/assessment",
				applicationCategory: "BusinessApplication",
			}),
		}),
	component: AssessmentPage,
});

function AssessmentPage() {
	return (
		<div className="section-wrapper">
			<span className="text-xs font-semibold uppercase tracking-widest text-green">
				Power your home
			</span>
			<h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl leading-[1.2]">
				Ten minutes for a real recommendation.
			</h1>
			<p className="mb-10 mt-3 max-w-2xl text-base leading-loose text-navy/70">
				Your size, your price range, and how it compares to what you already
				spend on fuel. We ask for your details only after you have seen the
				result.
			</p>

			<AssessmentWizard />
		</div>
	);
}
