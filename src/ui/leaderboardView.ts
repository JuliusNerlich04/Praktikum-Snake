export function renderLeaderboardView(container : HTMLElement) {
    container.innerHTML = `
        <table>
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
            <tr>
                <td>Max</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Julius</td>
                <td>99</td>
            </tr>
        </table>
    `
}