import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createSituation as createSituationRequest,
  getAlibiVotes,
  getRanking as getRankingRequest,
  getSituation as getSituationRequest,
  listSituations,
  reportAlibi,
  voteAlibi,
} from '../api/community.js'

export const fetchSituations = createAsyncThunk(
  'community/fetchSituations',
  async () => listSituations(),
)

export const fetchSituation = createAsyncThunk(
  'community/fetchSituation',
  async (id) => getSituationRequest(id),
)

export const createSituation = createAsyncThunk(
  'community/createSituation',
  async (payload) => createSituationRequest(payload),
)

export const fetchRanking = createAsyncThunk(
  'community/fetchRanking',
  async (type) => ({ type, ranking: await getRankingRequest(type) }),
)

export const fetchAlibiVotes = createAsyncThunk(
  'community/fetchAlibiVotes',
  async (alibiId) => ({ alibiId, data: await getAlibiVotes(alibiId) }),
)

export const submitVote = createAsyncThunk(
  'community/submitVote',
  async ({ alibiId, ratings }) => voteAlibi(alibiId, ratings),
)

export const submitReport = createAsyncThunk(
  'community/submitReport',
  async ({ alibiId, reason = '' }) => reportAlibi(alibiId, reason),
)

const initialState = {
  situations: [],
  situationsStatus: 'idle',
  situationsError: '',
  selectedSituation: null,
  situationStatus: 'idle',
  situationError: '',
  createStatus: 'idle',
  rankings: {},
  rankingStatus: {},
  rankingError: {},
  votesByAlibi: {},
  votesStatusByAlibi: {},
  voteStatusByAlibi: {},
  reportStatusByAlibi: {},
}

function errorMessage(action) {
  return action.error?.message || 'No se pudo completar la solicitud.'
}

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSituations.pending, (state) => {
        state.situationsStatus = 'loading'
        state.situationsError = ''
      })
      .addCase(fetchSituations.fulfilled, (state, action) => {
        state.situationsStatus = 'succeeded'
        state.situations = action.payload
      })
      .addCase(fetchSituations.rejected, (state, action) => {
        state.situationsStatus = 'failed'
        state.situationsError = errorMessage(action)
      })
      .addCase(fetchSituation.pending, (state) => {
        state.situationStatus = 'loading'
        state.situationError = ''
      })
      .addCase(fetchSituation.fulfilled, (state, action) => {
        state.situationStatus = 'succeeded'
        state.selectedSituation = action.payload
      })
      .addCase(fetchSituation.rejected, (state, action) => {
        state.situationStatus = 'failed'
        state.selectedSituation = null
        state.situationError = errorMessage(action)
      })
      .addCase(createSituation.pending, (state) => {
        state.createStatus = 'loading'
      })
      .addCase(createSituation.fulfilled, (state, action) => {
        state.createStatus = 'succeeded'
        state.situations.unshift(action.payload.situation)
      })
      .addCase(createSituation.rejected, (state) => {
        state.createStatus = 'failed'
      })
      .addCase(fetchRanking.pending, (state, action) => {
        const type = action.meta.arg
        state.rankingStatus[type] = 'loading'
        state.rankingError[type] = ''
      })
      .addCase(fetchRanking.fulfilled, (state, action) => {
        const { type, ranking } = action.payload
        state.rankingStatus[type] = 'succeeded'
        state.rankings[type] = ranking
      })
      .addCase(fetchRanking.rejected, (state, action) => {
        const type = action.meta.arg
        state.rankingStatus[type] = 'failed'
        state.rankingError[type] = errorMessage(action)
      })
      .addCase(fetchAlibiVotes.pending, (state, action) => {
        state.votesStatusByAlibi[action.meta.arg] = 'loading'
      })
      .addCase(fetchAlibiVotes.fulfilled, (state, action) => {
        const { alibiId, data } = action.payload
        state.votesStatusByAlibi[alibiId] = 'succeeded'
        state.votesByAlibi[alibiId] = data.votes
      })
      .addCase(fetchAlibiVotes.rejected, (state, action) => {
        state.votesStatusByAlibi[action.meta.arg] = 'failed'
      })
      .addCase(submitVote.pending, (state, action) => {
        state.voteStatusByAlibi[action.meta.arg.alibiId] = 'loading'
      })
      .addCase(submitVote.fulfilled, (state, action) => {
        const alibiId = action.meta.arg.alibiId
        state.voteStatusByAlibi[alibiId] = 'succeeded'
        const votes = state.votesByAlibi[alibiId] || []
        state.votesByAlibi[alibiId] = [action.payload.vote, ...votes]
      })
      .addCase(submitVote.rejected, (state, action) => {
        state.voteStatusByAlibi[action.meta.arg.alibiId] = 'failed'
      })
      .addCase(submitReport.pending, (state, action) => {
        state.reportStatusByAlibi[action.meta.arg.alibiId] = 'loading'
      })
      .addCase(submitReport.fulfilled, (state, action) => {
        state.reportStatusByAlibi[action.meta.arg.alibiId] = 'succeeded'
      })
      .addCase(submitReport.rejected, (state, action) => {
        state.reportStatusByAlibi[action.meta.arg.alibiId] = 'failed'
      })
  },
})

export default communitySlice.reducer
