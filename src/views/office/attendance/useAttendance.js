export default function useAttendance() {
  const resolveRankColor = rank => {
    if (rank === 5) return 'secondary'
    if (rank === 4) return 'primary'
    if (rank === 3) return 'warning'
    if (rank === 2) return 'danger'
    if (rank === 1) return 'info'
    return 'success'
  }

  return {
    resolveRankColor,
  }
}
