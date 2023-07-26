from flask import Flask, request, jsonify

app = Flask(__name__)

sudoku_board = None
invalid_moves = 0

def reset_sudoku_board():
    global sudoku_board
    sudoku_board = [[0] * 9 for _ in range(9)]  # Initialize a 9x9 Sudoku board

def is_valid_move(row, col, num):
    # Check if the move is valid in the row
    for i in range(9):
        if sudoku_board[row][i] == num:
            return False

    # Check if the move is valid in the column
    for i in range(9):
        if sudoku_board[i][col] == num:
            return False

    # Check if the move is valid in the 3x3 square
    start_row = (row // 3) * 3
    start_col = (col // 3) * 3
    for i in range(3):
        for j in range(3):
            if sudoku_board[start_row + i][start_col + j] == num:
                return False

    return True

@app.route('/api/start', methods=['POST'])
def start_game():
    global invalid_moves
    reset_sudoku_board()
    invalid_moves = 0
    return 'READY'

@app.route('/api/move', methods=['POST'])
def make_move():
    global invalid_moves
    row = int(request.form['row'])
    col = int(request.form['col'])
    num = int(request.form['num'])
    
    if is_valid_move(row, col, num):
        sudoku_board[row][col] = num
        invalid_moves = 0
        return 'Valid'
    else:
        invalid_moves += 1
        if invalid_moves >= 3:
            # Suggest a move if there have been 3 consecutive invalid moves
            # You can implement a method to generate a suggested move here
            suggestion = generate_suggested_move()
            return f'Invalid. Try {suggestion}'
        else:
            return 'Invalid'

if __name__ == '__main__':
    app.run()
