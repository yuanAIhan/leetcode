/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        return isSame(p , q);
    }
    bool isSame(TreeNode* l, TreeNode* r) {
        if(l ==nullptr && r ==nullptr) return true;
        if(l == nullptr && r != nullptr) return false;
        if(l != nullptr && r == nullptr) return false;
        if(l -> val != r -> val) return false;
        return isSame(l->left, r -> left) && isSame(l ->right, r-> right);
    }
};

//主要是将二叉树的遍历的思想使用到当前的遍历中！
//步骤都是首先将对应的当前节点的信息确认，然后递归确认左右子树的结果即可！
//可以是当前的单一的节点，也可以是当前的左右两个节点一起来！