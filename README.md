# Code smell parser kata
This kata has multiple use cases, initially it was thought of as a
refactoring kata where code smells shall be detected using JS parsing
with esprima. Which is also the first task. This way the developer
doing this kata will get a deeper understanding of certain code smells,
find them in code and write a simple tool for finding some of them.
Secondly, this kata hopefully leads to eating one's own dog food, which
is using it itself to detect duplicated code which can then be refactored.
Stage 3 is the extraction of external dependencies, such as esprima
and estraverse which are used in the initial state of the app.

# Possible tasks
1) Make the failing test for boolean trap smell pass. Try not to refactor in the production code
yet, that will be part of a later task, that hopefully jumps in the
users eyes automatically.
2) Implement the code duplication smell handling, tests are prepared for
it already, so the to do list is set.
