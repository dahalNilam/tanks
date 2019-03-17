import { IModal } from "./IModal";
import { ModalTypes } from "./ModalTypes";

type ModalHashTable<T extends object> = {
  [P in ModalTypes | number | string]: IModal<T>
};

const globalModals: ModalHashTable<any> = {};

/**
 * Registers a modal to a global modal handler
 *
 *
 * @export
 * @param {(IModal<any> | null)} modal
 * @returns
 */
export function registerModal<T extends object>(modal: IModal<T> | null) {
  if (!modal) {
    return;
  }
  globalModals[modal.type] = modal;
}

/**
 * Registers a modal to a global modal handler
 *
 *
 * @export
 * @param {(IModal<any> | null)} modal
 * @returns
 */
export function registerModalWithId(id: string | number) {
  if (!id) {
    return;
  }

  return (modal: IModal<any> | null) => {
    if (!modal) {
      return;
    }

    globalModals[id] = modal;
  };
}

/**
 * Show a modal, with optional parameters, using the instance of a component
 *
 * @export
 * @param {IModal<any>} modal
 * @param {{}} [params]
 * @returns
 */
export function showModal<T extends object>(modal: IModal<T>, params?: T) {
  if (!globalModals[modal.type]) {
    console.warn(
      `Could not find the modal (${
        modal.type
      }) in the global registry. Is the modal currently registered? (registerModal())`
    );
    return;
  }

  globalModals[modal.type].show(params);
}

/**
 * Show a modal, with optional parameters, using an id
 *
 * @export
 * @param {IModal<any>} modal
 * @param {{}} [params]
 * @returns
 */
export function showModalById<T extends object>(
  id: string | number,
  params?: T
) {
  if (!globalModals[id]) {
    console.warn(
      `Could not find the modal with the ID (${id}) in the global registry. Is the modal currently registered? (registerModal())`
    );
    return;
  }

  globalModals[id].show(params);
}

/**
 * Show a modal, with optional parameters, using a modal type
 *
 * @export
 * @param {ModalTypes} type
 * @param {{}} [params]
 * @returns
 */
export function showModalByType<T extends object>(
  type: ModalTypes,
  params?: T
) {
  if (!globalModals[type]) {
    console.warn(
      `Could not find the modal (${type}) in the global registry. Is the modal currently registered? (registerModal())`
    );
    return;
  }

  globalModals[type].show(params);
}
