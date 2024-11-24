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

});

export const checkAnswer = createAsyncThunk('quiz/checkAnswer', async ({ questionId, answer }: { questionId: number; answer: string }) => {

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
            })
            .addCase(loadQuestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load questions';
            })
            .addCase(checkAnswer.fulfilled, (state, action) => {
            })
            .addCase(checkAnswer.rejected, (state, action) => {
                state.feedback[action.meta.arg.questionId] = false;
            });
    }
});

export default quizSlice.reducer;