/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */

class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return dfs(root,INT_MIN, INT_MAX);
    }
    bool dfs(TreeNode* root, long long minv, long long maxv){
        if(!root) return true;
        if(root->val < minv || root->val > maxv) return false;
        return dfs(root->left,minv,root->val - 1ll) && dfs(root->right, root->val + 1ll, maxv);
    }
};
//或者首先中序遍历，然后判断是否为递增的！