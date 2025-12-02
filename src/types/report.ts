export interface ReportSummary {
    reportId: number;
    createdAt: string; // ISO 날짜 문자열
    contextTag: string;
    durationSeconds: number;
    relationshipStatus: string;
    piScore: number;
    ndiScore: number;
}

export interface DialogueLine {
    speaker: string; // "parent" | "child"
    text: string;
}

export interface PositiveMoment {
    dialogue: DialogueLine[];
    reason: string;
    pattern_hint: string;
    reference_descriptions: string[];
}

export interface NeedsImprovementMoment {
    dialogue: DialogueLine[];
    reason: string;
    better_response: string;
    pattern_hint: string;
    expert_references: any[];  // 배열이 비어 있으므로 any[]로 두거나 타입 정의 가능
    reference_descriptions: string[];
}

export interface PatternExample {
    pattern_name: string;
    occurrences: number;
    dialogue: DialogueLine[];
    problem_explanation: string;
    suggested_response: string;
}

export interface KeyMomentsProps {
    keyMoments: {
        positive: PositiveMoment[];
        needs_improvement: NeedsImprovementMoment[];
        pattern_examples: PatternExample[];
    };
}

// Step3
export interface StyleAnalysisDataType {
    summary: string;
    interaction_style: {
        parent_analysis: {
            categories: {
                name: string;
                ratio: number;
                label: string;
            }[];
        };
        child_analysis: {
            categories: {
                name: string;
                ratio: number;
                label: string;
            }[];
        };
    }
}

// Step4
export interface ChallengeType {
    title: string;
    goal: string;
    period_days: number;
    suggested_period: {
        start: string;
        end: string;
    };
    actions: string[];
    rationale: string | null;
}

export interface CoachingPlanType {
    summary: string;
    challenge: ChallengeType;
}

// Step5
export interface GrowthReport {
    analysis_session: {
        comment: string;
    };
    current_metrics: MetricItem[];
    challenge_evaluations: ChallengeEvaluation[];
}

export interface MetricItem {
    label: string;
    before: number | null;
    after: number | null;
    diff?: number | null;
    key: string | null;
    value: string | null;
    value_type: "ratio" | string;
}

export interface ChallengeEvaluation {
    challenge_name: string;
    actions: ActionEvaluation[];
}

export interface ChallengeInstance {
    timestamp: string;
    summary: string;
}

export interface ActionEvaluation {
    description: string;
    instances: ChallengeInstance[];
    action_id: number;
    detected_count: number;
}