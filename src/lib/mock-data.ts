import { DiveAnalysis } from "./types";

export const mockDiveData: DiveAnalysis = {
  overall_score: { raw_score: 8.7 },
  error_scores: {
    feet_apart: { interpretation: "No deduction — feet remained together." },
    straightness_during_entry: { percentile: 82 },
    splash: { max_splash_frame: 147 },
    som_position_tightness: { position: "Pike" }
  }
};

export const mockDiveDataPerfect: DiveAnalysis = {
  overall_score: { raw_score: 9.8 },
  error_scores: {
    feet_apart: { interpretation: "Perfect execution — feet locked." },
    straightness_during_entry: { percentile: 99 },
    splash: { max_splash_frame: 120 },
    som_position_tightness: { position: "Pike" }
  }
};

export const mockDiveDataLow: DiveAnalysis = {
  overall_score: { raw_score: 5.4 },
  error_scores: {
    feet_apart: { interpretation: "Major deduction — feet separated significantly." },
    straightness_during_entry: { percentile: 45 },
    splash: { max_splash_frame: 180 },
    som_position_tightness: { position: "Tuck" }
  }
};
