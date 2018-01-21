// service that serves up static content
app.service('contentService', function() {
    var terminalContent = [
        {
            input: 'whoami',
            delay: 2000,
            show: true,
            outputList: [ 
                { line: 'Hi, my name is Chris Asakawa.', show: false }, 
                { line: 'I\'m a software developer.', show: false },
            ],
        },
        {
            input: 'cat welcome.txt',
            delay: 5000,
            show: false,
            outputList: [ 
                { line: '***********************************', show: false }, 
                { line: '*  This portfolio contains:       *', show: false }, 
                { line: '* ------------------------------- *', show: false },
                { line: '*  - Academic Achievements        *', show: false }, 
                { line: '*  - Personal Projects            *', show: false }, 
                { line: '*  - Open Source Projects         *', show: false }, 
                { line: '*  - Freelance Work               *', show: false }, 
                { line: '***********************************', show: false }, 
            ],
        }
    ]
    var content = {
        bio: {
            title: 'Why I Do What I Do',
            body: 'Something that will always interest me is making things.        \
                   Which why I love what I do, there is nothing more rewarding then developing    \
                   software to solve complex problems. Writing code makes me feel empowered, to   \
                   create something useful out of nothing. The potential and innovations          \
                   of software never ceases to amaze me, and I look forward to learning more in   \
                   my future in programming.'
        }
    }
    this.getTerminalContent = function() {
        return terminalContent;
    }
    this.getContent = function() {
        return content;
    }
});