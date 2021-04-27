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
    TreeNode* deleteNode(TreeNode* root, int key) {
        if(!root) return nullptr;
        if(root -> val == key) {
            if(root -> left == nullptr) return root -> right;
            if(root -> right == nullptr) return root -> left;
            TreeNode* minNode = getMin(root -> right);

            root -> val = minNode -> val;
            
            root -> right = deleteNode(root -> right, minNode -> val);

        } else if(root -> val > key ) {
            root -> left = deleteNode(root -> left, key);
        } else if(root -> val < key) {
            root -> right = deleteNode(root -> right, key);
        }

        return root;
    }
    TreeNode* getMin(TreeNode* node) {
        while(node->left != nullptr) node = node -> left;
        return node;
    }
};

//删除的时候只需要处理对应的节点处信息的，不需要考虑其它地方的信息的。