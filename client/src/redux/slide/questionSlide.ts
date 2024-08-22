import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

interface QuizState {
    questions: Question[];
    selectedAnswers: { [key: number]: string };
    feedback: { [key: number]: boolean | null };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: QuizState = {
    questions: [],
    selectedAnswers: {},
    feedback: {},
    status: 'idle',
    error: null
};

export const loadQuestions = createAsyncThunk('quiz/loadQuestions', async () => {
//     const response = await fetchQuestions();
//     return response;
});

export const checkAnswer = createAsyncThunk('quiz/checkAnswer', async ({ questionId, answer }: { questionId: number; answer: string }) => {
//     const response = await submitAnswer(questionId, answer);
//     return { questionId, correct: response };
});

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadQuestions.fulfilled, (state, action) => {
                state.status = 'succeeded';
//                 state.questions = action.payload;
            })
            .addCase(loadQuestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load questions';
            })
            .addCase(checkAnswer.fulfilled, (state, action) => {
//                 const { questionId, correct } = action.payload;
//                 state.selectedAnswers[questionId] = action.payload.correct ? state.selectedAnswers[questionId] : '';
//                 state.feedback[questionId] = correct;
            })
            .addCase(checkAnswer.rejected, (state, action) => {
                state.feedback[action.meta.arg.questionId] = false;
            });
    }
});

export default quizSlice.reducer;