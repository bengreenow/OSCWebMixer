import Jsona from "jsona";
import { Plan, ServiceType } from "../models/Services";

export class Fetcher {
  private baseUrl: string;
  private appId: string;
  private secret: string;
  private worshipTeamId: string;
  private dataFormatter = new Jsona();

  constructor(config: {
    baseUrl: string;
    appId: string;
    secret: string;
    worshipTeamId: string;
  }) {
    this.baseUrl = config.baseUrl;
    this.appId = config.appId;
    this.secret = config.secret;
    this.worshipTeamId = config.worshipTeamId;
  }

  private async fetch(path: string, options: RequestInit) {
    const finalPath = `${this.baseUrl}${path}`;
    // console.log(`Fetching ${finalPath}`);

    const response = await fetch(finalPath, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${this.appId}:${this.secret}`)}`,
      },
    });

    return response.json();
  }

  async getServices() {
    const json = await this.fetch("/service_types", { method: "GET" });

    this.dataFormatter.serialize;

    return this.dataFormatter.deserialize(json) as ServiceType[];
  }

  private GENERAL_CATEGORY_ID = "4764879";
  async setPlanNote(
    noteContent: string,
    planId: string,
    serviceTypeId: string
  ) {
    const json = {
      data: {
        type: "PlanNote",
        attributes: {
          content: noteContent,
        },
        relationships: {
          plan_note_category: {
            data: {
              type: "PlanNoteCategory",
              id: this.GENERAL_CATEGORY_ID,
            },
          },
        },
      },
    };

    return await this.fetch(
      `/service_types/${serviceTypeId}/plans/${planId}/notes`,
      {
        method: "POST",
        body: JSON.stringify(json),
      }
    );
  }

  async getAllPlans() {
    const services = await this.getServices();

    const plans = services.flatMap(async (x) => {
      const servicePlans = await this.getPlansForServiceType(x.id);
      return servicePlans.map((y: any) => ({
        ...y,
        service_type: x,
      }));
    });
    const final = await Promise.all(plans);

    const allPlans = final.flat() as Plan[];

    allPlans.sort((a, b) => {
      return a.sort_date > b.sort_date ? 1 : -1;
    });

    return allPlans;
  }

  async getPlansForServiceType(
    serviceTypeId: string,
    futureOnly = true,
    includeSeries = true
  ) {
    const json = await this.fetch(
      `/service_types/${serviceTypeId}/plans${
        futureOnly ? "?filter=future" : ""
      }${includeSeries ? "&include=series" : ""}`,
      {
        method: "GET",
      }
    );

    return this.dataFormatter.deserialize(json);
  }

  async getTeamMembers(serviceTypeId: string, planId: string) {
    const json = await this.fetch(
      `/service_types/${serviceTypeId}/plans/${planId}/team_members`,
      {
        method: "GET",
      }
    );

    return this.dataFormatter.deserialize(json);
  }
}
