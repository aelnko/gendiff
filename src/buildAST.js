/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import _ from 'lodash';

const buildTree = (object1, object2) => {
  const result = _.sortBy(
    _.union(
      Object.keys(object1),
      Object.keys(object2),
    ),
  )
    // eslint-disable-next-line array-callback-return
    .map((key) => {
      if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
        const children = buildTree(object1[key], object2[key]);
        return {
          key, children, type: 'nested',
        };
      }
      if (!_.has(object2, key)) {
        return { key, value: object1[key], type: 'removed' };
      }
      if (!_.has(object1, key)) {
        return { key, value: object2[key], type: 'added' };
      }
      if (_.has(object1, key) && _.has(object2, key) && object1[key] === object2[key]) {
        return {
          key, value: object1[key], type: 'none',
        };
      }
      if (_.has(object1, key) && _.has(object2, key)) {
        return [
          {
            key, value: object1[key], type: 'removed',
          },
          {
            key, value: object2[key], type: 'added',
          },
        ];
      }
    });
  return result.flat();
};

// export const buildAST = (object1, object2) => ({
//   key: 'root',
//   type: 'nested',
//   children: buildTree(object1, object2),
// });

// console.log(JSON.stringify(buildTree(obj1, obj2), null, '   '), '\n\n\n');

// console.log(JSON.stringify(buildAST(obj1, obj2), null, '   '));
// console.log(buildTree(obj1, obj2));


export default buildTree;
