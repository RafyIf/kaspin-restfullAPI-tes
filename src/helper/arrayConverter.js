function getById(array = [], option = { key, value }) {
  for (let index = 0; index < array.length; index++) {
    if (array[index][option.key] === option.value) {
      return array[index]
    }
  }
}

function getByReference(array = [], option = { key, value }) {
  let relation = []
  for (let index = 0; index < array.length; index++) {
    if (array[index][option.key] === option.value) {
      relation.push(array[index])
    }
  }
  return relation
}

function withBelongsTo(array, reference = { arr, foreignKey, refKey, alias }) {
  let data = []
  for (let index = 0; index < array.length; index++) {
    for (let refIndex = 0; refIndex < reference.arr.length; refIndex++) {
      if (
        array[index][reference.foreignKey] ===
        reference.arr[refIndex][reference.refKey]
      ) {
        data.push({
          ...array[index],
          [reference.alias]: reference.arr[refIndex]
        })
      }
    }
  }
  return data
}

function searchArray(array = [], option = { key, value }) {
  let data = []
  for (let index = 0; index < array.length; index++) {
    if (
      array[index][option.key]
        ?.toLowerCase()
        .includes(option.value.toLowerCase())
    ) {
      data.push(array[index])
    }
  }
  return data
}

module.exports = {
  getById,
  getByReference,
  searchArray,
  withBelongsTo
}
