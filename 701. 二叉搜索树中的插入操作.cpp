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
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if(!root) return new TreeNode(val);
        if(root -> val < val) 
            root -> right = insertIntoBST(root -> right, val);
        if(root -> val > val)
            root -> left = insertIntoBST(root -> left, val);
        return root;
    }
};
//因为插入的时候，首先是对于根节点的处理，如果当前根节点是空的时候，那么直接插入对应的根节点处
//否则判断当前的值与根节点的大小关系，然后去决定应该放在左边还是放在右边。
//直接递归