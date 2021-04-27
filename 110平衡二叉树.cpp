class Solution {
public:
    // 返回以该节点为根节点的二叉树的高度，如果不是二叉搜索树了则返回-1
    int getDepth(TreeNode* node) {
        if (node == NULL) {
            return 0;
        }

        int leftDepth = getDepth(node->left);
        if (leftDepth == -1) return -1; // 说明左子树已经不是二叉平衡树

        int rightDepth = getDepth(node->right);
        if (rightDepth == -1) return -1; // 说明右子树已经不是二叉平衡树

        return abs(leftDepth - rightDepth) > 1 ? -1 : 1 + max(leftDepth, rightDepth);
    }

    bool isBalanced(TreeNode* root) {
        return getDepth(root) == -1 ? false : true; 
    }
    int getDepth(TreeNode* root) {
        if(!root) return;
        int left = getDepth(root -> left);
        if(left == -1) return -1;

        int right = getDepth(root -> right);
        if(right == -1) return -1;

        return abs(left - right) > 1 ? -1 : 1 + max(left, right);

    }
};

//递归的时候要相信递归是可以完成对应的操作的
//判别好对应的逻辑后，也就是使用单一的一个节点来判断是否满足递归的性质！
//然后去再次实现最后的左右子树的往下递归实现！