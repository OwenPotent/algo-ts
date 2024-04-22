// Level Order Traversal: Traverse a binary tree level by level (visit all nodes at a given level before moving to the next level).
// Inorder Successor in BST: Given a node in a binary search tree (BST), find the next node (in-order successor) that comes after it in the in-order traversal.
// Construct Binary Tree from Preorder and Inorder Traversals: Reconstruct a binary tree from its preorder and inorder traversals.

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Traverses a binary tree level by level.
 * @param root - The root of the binary tree.
 * @returns An array of arrays containing the nodes at each level.
 */
export function levelOrderTraversal(root: TreeNode | null): number[][] {
    if (!root) {
        return [];
    }

    const result: number[][] = [];
    const queue: TreeNode[] = [root];

    while (queue.length) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift() as TreeNode;
            currentLevel.push(node.val);

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }

        result.push(currentLevel);
    }

    return result;
}

/**
 * Finds the in-order successor of a node in a binary search tree.
 * @param root - The root of the binary search tree.
 * @param p - The node whose in-order successor is to be found.
 * @returns The in-order successor of the node.
 */
export function inorderSuccessor(root: TreeNode | null, p: TreeNode | null): TreeNode | null {
    if (!root || !p) {
        return null;
    }

    let successor: TreeNode | null = null;

    while (root) {
        if (p.val < root.val) {
            successor = root;
            root = root.left;
        } else {
            root = root.right;
        }
    }

    return successor;
}

/**
 * Reconstructs a binary tree from its preorder and inorder traversals.
 * @param preorder - The preorder traversal of the binary tree.
 * @param inorder - The inorder traversal of the binary tree.
 * @returns The root of the reconstructed binary tree.
 */
export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!preorder.length || !inorder.length) {
        return null;
    }

    const root = new TreeNode(preorder[0]);
    const rootIndex = inorder.indexOf(preorder[0]);

    root.left = buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex));
    root.right = buildTree(preorder.slice(rootIndex + 1), inorder.slice(rootIndex + 1));

    return root;
}

export { TreeNode };