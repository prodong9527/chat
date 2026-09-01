import { describe, expect, it } from "vitest";
import { getDailyFortune } from "./fortune";
describe("daily fortune", () => { it("returns the same fortune for a date and device", () => expect(getDailyFortune("2026-09-01", "device-a")).toEqual(getDailyFortune("2026-09-01", "device-a"))); it("changes the following date", () => expect(getDailyFortune("2026-09-01", "device-a")).not.toEqual(getDailyFortune("2026-09-02", "device-a"))); });
