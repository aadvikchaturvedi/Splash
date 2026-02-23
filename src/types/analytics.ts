// Strict TypeScript interfaces for the external AI analytics API response

export interface FeetApartScore {
  interpretation: string;
}

export interface StraightnessDuringEntryScore {
  percentile: number;
}

export interface SplashScore {
  max_splash_frame: number;
}

export interface SomPositionTightnessScore {
  position: string;
}

export interface ErrorScores {
  feet_apart: FeetApartScore;
  straightness_during_entry: StraightnessDuringEntryScore;
  splash: SplashScore;
  som_position_tightness: SomPositionTightnessScore;
}

export interface OverallScore {
  raw_score: number;
}

export interface AnalyticsResponse {
  overall_score: OverallScore;
  error_scores: ErrorScores;
}

// Mock data for development fallback
export const MOCK_ANALYTICS: AnalyticsResponse = {
  overall_score: {
    raw_score: 87.4,
  },
  error_scores: {
    feet_apart: {
      interpretation: "No deduction — feet remained together throughout entry.",
    },
    straightness_during_entry: {
      percentile: 82,
    },
    splash: {
      max_splash_frame: 147,
    },
    som_position_tightness: {
      position: "Pike",
    },
  },
};
