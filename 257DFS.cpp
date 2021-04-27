struct TreeNode
{
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode():val(0),left(nullptr),right(nullptr){}
    TreeNode(int x):val(x), left(nullptr), right(nullptr){}
    TreeNode(int x, TreeNode* left, TreeNode* right): val(x), left(left), right(right){}
};

class Solution{
    public:

        void DFS(TreeNode* root, vector<string>&res, vector<int>& path) {
            path.push_back(root -> val);
            if(root -> left == nullptr && root -> right == nullptr) {

                for(int i=0; i <path.size();i++) {
                    cout << path[i] << endl;
                }

            }
            if(root -> left) {
                DFS(root -> left, res, path);
                path.pop_back();
            }
            
            if(root -> right) {
                DFS(root->right, res, path);
                path.pop_back();
            }

            // 「回溯和递归是一一对应的，有一个递归，就要有一个回溯」
        }
};
