operator()(member_type teamMember) {
    int elment = teamMember.league_rank();
    parallel_for(
        TeamThreadRange(teamMember, numberOfQPs), [=](int qp) {
            double total = 0;
            for(int i = 0; i < vectorSize; ++i) {
                total += A(element, qp, i) * B(element, i);
            }
            result(element, qp) = total;
        }
    )
}

