export function formatDate(dateString) {
  const date = new Date(dateString);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];

  const hour = date.getHours();

  const formattedDate = `${dayOfWeek} ${hour}.00`;

  return formattedDate;
}

export function recommendSeats(seats, amount) {
  if (!amount || amount < 1) {
    return seats;
  }
  const rows = 5;
  const rowSeats = 10;

  function isBlockAvailable(rowIndex, startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
      if (seats[rowIndex * 10 + i].occupied) {
        return false;
      }
    }
    return true;
  }

  function findAvailableBlock() {
    let bestDistance = Infinity;
    let bestBlock = null;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rowSeats; j++) {
        let rowIndex = i;
        let startIndex = j;
        let endIndex = +j + +amount - 1;

        if (
          endIndex < rowSeats &&
          isBlockAvailable(rowIndex, startIndex, endIndex)
        ) {
          let rowDistance = Math.abs(2 - i);
          let seatDistance = Math.abs(4.5 - (startIndex + endIndex) / 2);

          let totalDistance = rowDistance + seatDistance;
          if (totalDistance < bestDistance) {
            bestDistance = totalDistance;
            bestBlock = { rowIndex, startIndex, endIndex };
          }
        }
      }
    }
    return bestBlock;
  }

  const availableBlock = findAvailableBlock();
  if (!availableBlock) {
    return seats;
  }

  const { rowIndex, startIndex, endIndex } = availableBlock;

  const updatedSeats = seats.map((seat, index) => {
    const curRow = Math.floor(index / 10);
    const curSeat = index % 10;

    if (curRow === rowIndex && curSeat >= startIndex && curSeat <= endIndex) {
      return { ...seat, recommended: true };
    }
    return seat;
  });

  return updatedSeats;
}
