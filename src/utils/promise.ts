export function forEachAsync<T>(
  array: T[],
  callback: (item: T) => Promise<void>
): Promise<void> {
  return array.reduce(
    (promise, item) => promise.then(() => callback(item)),
    Promise.resolve()
  );
}

// 把 document.querySelectorAll 的 foreach 包裝成 Promise
export function forEachAsyncNodeList<T extends Node>(
  nodeList: NodeList,
  callback: (item: T) => Promise<void>
): Promise<void> {
  return forEachAsync(Array.from(nodeList) as T[], callback);
}
