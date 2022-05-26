import _ from 'lodash';

export const buildTree = (object1, object2) => {
  return _.sortBy(_.union(
    Object.keys(object1),
    Object.keys(object2)
  ))
    .map((key) => {
      if (!_.has(object2, key)) {
        return { key, value: object1[key], type: "removed" }
      }
      
      if (!_.has(object1, key)) {
        return { key, value: object2[key], type: "added" }
      }

      if (_.has(object1, key) && _.has(object2, key) && object1[key] === object2[key]) {
        return {
          key, value: object1[key], type: "none"
        }
      }

      if (_.has(object1, key) && _.has(object2,key)) {
        return [
          {
            key, value: object1[key], type: "removed"
          },
          {
            key, value: object2[key], type: "added"
          }
        ]
      } 
    })
}

// const obj1 = {
//   "host": "hexlet.io",
//   "timeout": 50,
//   "proxy": "123.234.53.22",
//   "follow": false
// };

// const obj2 = {
//   "timeout": 20,
//   "verbose": true,
//   "host": "hexlet.io"
// };

// console.log(buildTree(obj1, obj2));