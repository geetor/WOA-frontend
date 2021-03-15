export default function useAttendance() {
  const resolveRankColor = rank => {
    if (rank === 6) return 'success'
    if (rank === 5) return 'primary'
    if (rank === 4) return 'warning'
    if (rank === 3) return 'danger'
    return 'secondary'
  }

  return {
    resolveRankColor,
  }
}
